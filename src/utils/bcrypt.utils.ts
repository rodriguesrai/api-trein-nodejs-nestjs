// bcrypt.utils.ts

import * as bcrypt from 'bcrypt';

// Função para criar um hash de senha
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

// Função para comparar uma senha com um hash
export async function comparePasswords(
  password: string,
  hash: string,
): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}
