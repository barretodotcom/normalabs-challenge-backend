import { Request, Response } from "express";
import { ChangeTaskStatus } from "../services/ChangeTaskStatus";
import { CreateServiceDesk } from "../services/CreateServiceDesk";
import { DeleteServiceDesk } from "../services/DeleteServiceDesk";
import { ListServiceDesk } from "../services/ListServiceDesk";

export class ServiceDeskController {
    public async create(request: Request, response: Response): Promise<Response> {
        const createServiceDesk = new CreateServiceDesk();

        const userId = request.user.id;

        const { details, initialDate, finalDate, title } = request.body;

        const serviceDesk = await createServiceDesk.execute({ details, initialDate, finalDate, title, userId });

        return response.json(serviceDesk);
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const deleteServiceDesk = new DeleteServiceDesk();

        const userId = request.user.id
        const { serviceDeskId } = request.params;
        const { reason } = request.body;

        await deleteServiceDesk.execute(userId, serviceDeskId, reason);

        return response.json({ message: "Tarefa deletada com sucesso." });
    }

    public async list(request: Request, response: Response): Promise<Response> {
        const listServiceDesk = new ListServiceDesk();

        const serviceDesks = await listServiceDesk.execute();

        return response.json(serviceDesks);
    }

    public async patch(request: Request, response: Response): Promise<Response> {
        const changeTaskStatus = new ChangeTaskStatus();

        const { serviceDeskId } = request.params;
        const { status } = request.body;

        const task = await changeTaskStatus.execute({ serviceDeskId, status });

        return response.json(task);
    }
}
