"use client";
import { Heading } from "@/shared/ui/heading";
import clsx from "clsx";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { usePrivy } from "@privy-io/react-auth";

interface UserData {
  nickname: string;
}

interface LeaderboardData {
  points: number;
  activeDays: number;
  position: number;
}

export function UserProfile() {
  const { getAccessToken } = usePrivy();
  const [hintOpen, setHintOpen] = useState(false);
  const [user, setUser] = useState<UserData>({ nickname: "" });
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData>({
    points: 0,
    activeDays: 0,
    position: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Функция для получения токена через Privy
  const getToken = useCallback(async () => {
    try {
      return await getAccessToken();
    } catch (error) {
      console.error("Error getting access token:", error);
      return null;
    }
  }, [getAccessToken]);

  // Функция для создания/обновления пользователя
  const createUser = useCallback(async () => {
    const token = await getToken();
    if (!token) {
      setError("Authentication token not found");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://dev.clashofcoins.app/api/user", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          fromTrustdropPage: false,
          fromPiratedropPage: false,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData || `HTTP error! status: ${response.status}`);
      }

      const userData = await response.json();
      console.log("User created/updated:", userData);
      return userData;
    } catch (err) {
      console.error("Ошибка при создании/обновлении пользователя:", err);
      // Если пользователь уже существует (статус 409), это нормально
      if (err instanceof Error && err.message.includes("409")) {
        console.log("User already exists, continuing...");
        return;
      }
      throw err;
    }
  }, [getToken]);

  // Функция для запроса данных пользователя
  const fetchUserData = useCallback(async () => {
    const token = await getToken();
    if (!token) {
      setError("Authentication token not found");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://dev.clashofcoins.app/api/user/nickname",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const userData = await response.json();
      setUser(userData);
    } catch (err) {
      console.error("Ошибка при загрузке данных пользователя:", err);
      setError("Failed to load user data");
    }
  }, [getToken]);

  // Функция для запроса данных лидерборда
  const fetchLeaderboardData = useCallback(async () => {
    const token = await getToken();
    if (!token) {
      setError("Authentication token not found");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://dev.clashofcoins.app/api/leaderboard/user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const leaderboardData = await response.json();
      setLeaderboardData(leaderboardData);
    } catch (err) {
      console.error("Ошибка при загрузке данных лидерборда:", err);
      setError("Failed to load leaderboard data");
    }
  }, [getToken]);

  // Загружаем данные при монтировании компонента
  useEffect(() => {
    const loadData = async () => {
      const token = await getToken();
      if (!token) {
        setError("Authentication token not found");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Сначала создаем/обновляем пользователя
        await createUser();

        // Затем загружаем данные пользователя и лидерборда
        await Promise.all([fetchUserData(), fetchLeaderboardData()]);
      } catch (err) {
        console.error("Error loading data:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [createUser, fetchUserData, fetchLeaderboardData, getToken]);

  // Функция для форматирования ранга
  const formatRank = (position: number) => {
    if (position >= 20000) return "20K+";
    if (position >= 10000) return "10K+";
    if (position >= 1000) return "1K+";
    if (position >= 100) return "100+";
    return position.toString();
  };

  if (loading) {
    return (
      <div
        className="w-full rounded-xl border border-[#FFFFFF14] bg-black/60 backdrop-blur-md p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
      >
        <div className="flex items-center justify-center h-20">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <div className="text-white text-sm">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="w-full rounded-xl border border-[#FFFFFF14] bg-black/60 backdrop-blur-md p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
      >
        <div className="flex flex-col items-center justify-center h-20 text-center space-y-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <div className="text-white font-semibold text-sm">
            Authentication Required
          </div>
          <div className="text-gray-300 text-xs max-w-xs">
            Please log in with your wallet to view your profile information and
            leaderboard stats
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full rounded-xl border border-[#FFFFFF14] bg-black/60 backdrop-blur-md p-3"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-12 h-12 mr-3 bg-[#23263A] flex items-center justify-center rounded-full">
            <Image
              src="/icons/treasury/avatar-icon.svg"
              width={20}
              height={20}
              alt="avatar"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-0">
              <p className="text-xs font-bold text-[#9DAFFE] leading-none text-left">
                Username
              </p>
              <div className="truncate w-full uppercase text-white text-lg leading-none font-bold text-left">
                <Heading className="truncate w-[120px]">
                  {user.nickname || "Loading..."}
                </Heading>
              </div>
            </div>

            <div className="flex flex-col gap-0">
              <p className="text-xs font-bold text-[#9DAFFE] leading-none text-left">
                Activity points
              </p>
              <div className="truncate w-full uppercase text-white text-lg leading-none font-bold text-left">
                <Heading className="truncate">{leaderboardData.points}</Heading>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center relative">
          <div
            className={clsx({
              "absolute bottom-[calc(100%+0px)] right-0 translate-x-1/2 transition-all pointer-events-none flex flex-col":
                true,
              "opacity-0": !hintOpen,
              "opacity-100": hintOpen,
            })}
          >
            <p className="bg-white text-black font-bold text-[10px] text-center items-center justify-center leading-none font-jura min-w-[50px] rounded-md px-2 py-1 relative">
              {leaderboardData.position + 1}
            </p>
            <div className="w-0 h-0 border-solid border-x-[5px] border-b-[5px] border-x-transparent border-b-white rotate-180 ml-1" />
          </div>

          <div
            className="flex flex-col justify-center items-center h-10 w-10 relative cursor-pointer"
            onMouseEnter={() => {
              if (leaderboardData.position + 1 > 100) {
                setHintOpen(true);
              }
            }}
            onMouseLeave={() => {
              setHintOpen(false);
            }}
          >
            <div className="hexagon flex items-center justify-center absolute top-0 left-0 w-full h-full" />
            <span className="text-white font-bold leading-none uppercase text-sm">
              {formatRank(leaderboardData.position + 1)}
            </span>
          </div>

          <span className="text-white text-xs font-bold pt-1">YOUR RANK</span>
        </div>
      </div>
    </div>
  );
}
