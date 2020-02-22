export interface User {
  id: string;
  name: string;
  email: string;
  devices?: Array<Device>;
}

export interface Device{
  id: string;
  user_id: number;
  description: string;
  ip: string;
  capacity: number;
  load?: number;
  apps?: Array<App>
}

export interface App{
  id: string;
  title: string;
  size: number; 
  host_id: string;
}