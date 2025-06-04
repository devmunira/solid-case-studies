// An application initially uses a local database for user authentication. Later, it might switch to an external identity provider, such as OAuth or SAML. The core authentication and authorization logic should remain unaffected by the change in authentication providers.

//  interfaces
interface IUser {
  id: string;
  email: string;
  name: string;
  roles: string[];
}

interface IAuthResult {
  success: boolean;
  user?: IUser;
  token?: string;
  error?: string;
}

interface IAuthProvider {
  authenticate(credentials: AuthCredentials): Promise<IAuthResult>;
  validateToken(token: string): Promise<IAuthResult>;
  logout(token: string): Promise<void>;
}

// Data transfer objects
interface AuthCredentials {
  email: string;
  password: string;
}

//  implementations
class LocalAuthProvider implements IAuthProvider {
  private users: Map<string, IUser> = new Map();

  async authenticate(credentials: AuthCredentials): Promise<IAuthResult> {
    const user = this.users.get(credentials.email);

    if (!user) {
      return {
        success: false,
        error: "User not found",
      };
    }

    // In a real implementation, we would verify the password hash and more logic right now I am not focusing on business logic
    return {
      success: true,
      user,
      token: this.generateToken(user),
    };
  }

  async validateToken(token: string): Promise<IAuthResult> {
    return {
      success: true,
      user: this.users.get("test@example.com"),
    };
  }

  async logout(token: string): Promise<void> {
    console.log("User logged out");
  }

  private generateToken(user: IUser): string {
    return `token-${user.id}`;
  }
}

class OAuthAuthProvider implements IAuthProvider {
  private readonly provider: string;

  constructor(provider: string) {
    this.provider = provider;
  }

  async authenticate(credentials: AuthCredentials): Promise<IAuthResult> {
    console.log(`Authenticating with ${this.provider}...`);

    return {
      success: true,
      user: {
        id: "oauth-user",
        email: credentials.email,
        name: "OAuth User",
        roles: ["user"],
      },
      token: "oauth-token",
    };
  }

  async validateToken(token: string): Promise<IAuthResult> {
    return {
      success: true,
      user: {
        id: "oauth-user",
        email: "user@example.com",
        name: "OAuth User",
        roles: ["user"],
      },
    };
  }

  async logout(token: string): Promise<void> {
    console.log(`Logging out from ${this.provider}...`);
  }
}

// Factory for creating auth providers
class AuthProviderFactory {
  static createProvider(
    type: "local" | "oauth",
    options?: { provider?: string }
  ): IAuthProvider {
    switch (type) {
      case "local":
        return new LocalAuthProvider();
      case "oauth":
        if (!options?.provider) {
          throw new Error("OAuth provider name is required");
        }
        return new OAuthAuthProvider(options.provider);
      default:
        throw new Error("Invalid auth provider type");
    }
  }
}

// Authentication service that uses the provider
class AuthenticationService {
  private authProvider: IAuthProvider;

  constructor(authProvider: IAuthProvider) {
    this.authProvider = authProvider;
  }

  async login(credentials: AuthCredentials): Promise<IAuthResult> {
    return this.authProvider.authenticate(credentials);
  }

  async validateToken(token: string): Promise<IAuthResult> {
    return this.authProvider.validateToken(token);
  }

  async logout(token: string): Promise<void> {
    await this.authProvider.logout(token);
  }
}

// Example usage
async function main() {
  // Create authentication service with local provider
  const localAuthService = new AuthenticationService(
    AuthProviderFactory.createProvider("local")
  );

  // Create authentication service with OAuth provider
  const oauthAuthService = new AuthenticationService(
    AuthProviderFactory.createProvider("oauth", { provider: "google" })
  );

  // Test local authentication
  const localResult = await localAuthService.login({
    email: "test@example.com",
    password: "password123",
  });

  // Test OAuth authentication
  const oauthResult = await oauthAuthService.login({
    email: "user@example.com",
    password: "oauth-password",
  });
}

main().catch(console.error);
