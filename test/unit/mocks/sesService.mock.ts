import { SesService } from '../../../src/services/ses.service'; // Importe a classe original

export class SesServiceMock implements Partial<SesService> {
  async sendEmail(to: string): Promise<void> {
    // Implemente o comportamento mockado, se necessário
  }

  async sendEmailCreatedUser(to: string): Promise<void> {
    // Implemente o comportamento mockado, se necessário
  }
}