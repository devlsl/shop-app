import { AuthContext } from 'ts-api-generator';

export type AuthState = { isShownSignInPopup: boolean } & (
    | {
          status: 'checking';
          user: undefined;
      }
    | {
          status: 'unauthorized';
          user: null;
      }
    | {
          status: 'authorized';
          user: AuthContext;
      }
);
