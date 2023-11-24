import type { User } from "@prisma/client";

export function editUserCreditsRemaining(user: User, newCreditsRemaining: number): User {
    return {...user, creditsRemaining: newCreditsRemaining}
}

export function roundUsersCredits(user: User | undefined): string | undefined {
    return user?.creditsRemaining.toFixed(2)
}