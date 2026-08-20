import apiClient from "./apiClient";

export const getLeaderboard = async (gameName: string) => {
    const response = await apiClient.get(`/games/leaderboard/${gameName}`);
    return response.data;
};