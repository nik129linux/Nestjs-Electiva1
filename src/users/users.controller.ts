import { Controller, Get, Param } from '@nestjs/common';

interface User {
    id: number;
    name: string;
    email: string;
}


@Controller('users')
export class UsersController {

    private users: User[] = [
        { id: 1, name: 'Juan', email: 'juan.perez@example.com' },
        { id: 2, name: 'María', email: 'maria.gomez@example.com' },
        { id: 3, name: 'Carlos', email: 'carlos.lopez@example.com' },
        { id: 4, name: 'Ana', email: 'ana.martinez@example.com' },
        { id: 5, name: 'Luis', email: 'luis.rodriguez@example.com' },
        { id: 6, name: 'Laura', email: 'laura.fernandez@example.com' },
        { id: 7, name: 'Diego Ramírez', email: 'diego.ramirez@example.com' },
        { id: 8, name: 'Sofía Torres', email: 'sofia.torres@example.com' },
        { id: 9, name: 'Javier Morales', email: 'javier.morales@example.com' },
        { id: 10, name: 'Valentina Castro', email: 'valentina.castro@example.com' },
        { id: 11, name: 'Andrés Romero', email: 'andres.romero@example.com' },
        { id: 12, name: 'Camila Ruiz', email: 'camila.ruiz@example.com' },
        { id: 13, name: 'Mateo Herrera', email: 'mateo.herrera@example.com' },
        { id: 14, name: 'Lucía Ortiz', email: 'lucia.ortiz@example.com' },
        { id: 15, name: 'Gabriel Silva', email: 'gabriel.silva@example.com' },
        { id: 16, name: 'Elena Vargas', email: 'elena.vargas@example.com' },
        { id: 17, name: 'Felipe Mendoza', email: 'felipe.mendoza@example.com' },
        { id: 18, name: 'Paula Cruz', email: 'paula.cruz@example.com' },
        { id: 19, name: 'Nicolás Díaz', email: 'nicolas.diaz@example.com' },
        { id: 20, name: 'Isabella Reyes', email: 'isabella.reyes@example.com' },
    ];

    @Get('')
    getUsers() {
        return this.users
    }

    @Get(':id')
    getUserById(@Param('id') id: string) {
        console.log('.:: User ID: ', id)
        return this.users.find(user => user.id === Number(id))

    }
    @Get('search/:name')
    getUserByName(@Param('name') name: string) {
        const data = this.users.find((user) => user.name === name);
        if (data) {
            return { result: data?.email };
        } else {
            return { result: 'Usuario no encontrado' };
        }

    }
}
