// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface ISignatureTransfer {
    struct TokenPermissions {
        address token;
        uint256 amount;
    }

    struct PermitTransferFrom {
        TokenPermissions permitted;
        uint256 nonce;
        uint256 deadline;
    }

    struct SignatureTransferDetails {
        address to;
        uint256 requestedAmount;
    }

    function permitTransferFrom(
        PermitTransferFrom memory permit,
        SignatureTransferDetails calldata transferDetails,
        address owner,
        bytes calldata signature
    ) external;
}

/**
 * @title BonusClaim
 * @dev Contract for managing bonus claims with two methods:
 *      - Basic claim method that emits an event
 *      - Permit2-based claim method that transfers 1 cent USDC from user
 */
contract BonusClaim is Ownable {
    /// @notice Address of the USDC token contract
    address public immutable usdcToken;

    /// @notice Address of the Permit2 contract
    address public immutable permit2;

    /// @notice Amount of USDC to transfer (1 cent = 0.01 USDC, assuming 6 decimals)
    uint256 public constant USDC_AMOUNT = 10000; // 0.01 USDC with 6 decimals

    /// @notice Tracks whether a user has claimed bonus via basic method
    mapping(address => bool) public basicClaimed;

    /// @notice Tracks whether a user has claimed bonus via permit method
    mapping(address => bool) public permitClaimed;

    /// @notice Reverts when the provided USDC address is invalid
    error InvalidUSDCAddress();

    /// @notice Reverts when the provided Permit2 address is invalid
    error InvalidPermit2Address();

    /// @notice Reverts when USDC transfer fails
    error USDCTransferFailed();

    /// @notice Reverts when user tries to claim basic bonus more than once
    error BasicBonusAlreadyClaimed();

    /// @notice Reverts when user tries to claim permit bonus more than once
    error PermitBonusAlreadyClaimed();

    /// @notice Event emitted when a user claims bonus via basic method
    event BonusClaimed(address indexed user);

    /// @notice Event emitted when a user claims bonus via permit2 method
    event BonusClaimedWithPermit(address indexed user, uint256 usdcAmount);

    /**
     * @dev Constructor initializes the contract with USDC token address, Permit2 address and owner.
     * @param _usdcToken The address of the USDC token contract
     * @param _permit2 The address of the Permit2 contract
     * @param _owner The address of the contract owner
     */
    constructor(
        address _usdcToken,
        address _permit2,
        address _owner
    ) Ownable(_owner) {
        if (_usdcToken == address(0)) {
            revert InvalidUSDCAddress();
        }
        if (_permit2 == address(0)) {
            revert InvalidPermit2Address();
        }

        usdcToken = _usdcToken;
        permit2 = _permit2;
    }

    /**
     * @dev Allows a user to claim bonus without any payment.
     *      Emits an event indicating the user has claimed the bonus.
     *      Can only be called once per user.
     */
    function claimBonusForVerifiedUser() external {
        if (basicClaimed[msg.sender]) {
            revert BasicBonusAlreadyClaimed();
        }

        basicClaimed[msg.sender] = true;
        emit BonusClaimed(msg.sender);
    }

    /**
     * @dev Allows a user to claim bonus by paying 1 cent USDC using permit2.
     *      Transfers USDC from user to contract and emits an event.
     *      Can only be called once per user.
     * @param nonce The nonce for the permit
     * @param deadline The deadline for the permit
     * @param signature The signature for the permit
     */
    function claimBonusForVerifiedUserPermit(
        uint256 nonce,
        uint256 deadline,
        bytes calldata signature
    ) external {
        if (permitClaimed[msg.sender]) {
            revert PermitBonusAlreadyClaimed();
        }
        ISignatureTransfer.PermitTransferFrom memory permit = ISignatureTransfer
            .PermitTransferFrom({
                permitted: ISignatureTransfer.TokenPermissions({
                    token: usdcToken,
                    amount: USDC_AMOUNT
                }),
                nonce: nonce,
                deadline: deadline
            });

        ISignatureTransfer.SignatureTransferDetails
            memory transferDetails = ISignatureTransfer
                .SignatureTransferDetails({
                    to: address(this),
                    requestedAmount: USDC_AMOUNT
                });

        ISignatureTransfer(permit2).permitTransferFrom(
            permit,
            transferDetails,
            msg.sender,
            signature
        );

        permitClaimed[msg.sender] = true;
        emit BonusClaimedWithPermit(msg.sender, USDC_AMOUNT);
    }
}
