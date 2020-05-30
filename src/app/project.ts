import { Employee } from './employee';
export class Task {

    taskName: String;
    status: String;
    responsible: Employee;
    startDate: String;
    endDate: String;
    defenition: String;
    taskBought: Boolean;
}
export class Project {
    _id: String;
    name: String;
    status: String;
    responsible: Employee;
    startDate: String;
    endDate: String;
    deadline: String;
    tasks: Task[];
}

export enum ProjectStatus {
    performed = 'Выполняется',
    done = 'Выполнено'
}
