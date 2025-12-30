export type CreateSessionData = {
  jti: string;
  hashedRefreshToken: string;
  userId: number;
};

export type UpdateSessionData = {
  jti: string;
  hashedRefreshToken: string;
};
