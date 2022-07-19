import { Request, Response } from "express";
import { CreatePaycheckService } from "../services/CreatePaycheckService";
import { DeletePaycheckService } from "../services/DeletePaycheckService";
import { ListPaychecksService } from "../services/ListPaychecksService";

export class PaycheckController {
    public async create(request: Request, response: Response): Promise<Response> {
        const createPaycheckService = new CreatePaycheckService();

        const { companyName, socialReason, cnpj, money, extraTime, accountNumber, userCpf } = request.body;

        const paycheck = await createPaycheckService.execute({ companyName, socialReason, cnpj, money, extraTime, accountNumber, userCpf })

        return response.json(paycheck);
    }

    public async list(request: Request, response: Response): Promise<Response> {
        const listPaycheckService = new ListPaychecksService();

        const paychecks = await listPaycheckService.execute();

        return response.json(paychecks);
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const deletePaycheckService = new DeletePaycheckService();

        const { paycheckId } = request.params;

        await deletePaycheckService.execute(paycheckId);

        return response.json({ message: "Contra-cheque deletado com sucesso!" });
    }
}