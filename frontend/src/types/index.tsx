export interface LeaderboardEntry {
  userId: any;
  username: string;
  score: number;
  date: string;
}

export interface Topic{
    id: string,
    title: string,
    icon: string,
    slug: string
}

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface ContentBlock{
    id: string,
    type: 'text' | 'image';
    value: string;
}

export interface TopicData{
    id: string,
    slug: string,
    title: string,
    description: string,
    contentBlocks: ContentBlock[]
    gameRegistryKey: string | null
} 