/* eslint-disable prettier/prettier */
import { InjectConnection } from "@nestjs/mongoose";

export function DatabaseConnection(
    connectionName?: string
): (target: Record<string, any>, key: string | symbol, index?: number) => void {
    return InjectConnection(connectionName);
}