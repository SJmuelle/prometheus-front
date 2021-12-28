import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ExampleComponent } from 'app/modules/admin/example/example.component';
import { HojavidaModule } from '../apps/hojavida/hojavida.module';

const exampleRoutes: Route[] = [
    {
        path: '',
        component: ExampleComponent,
        children: [
            {
                path: 'hoja-vida',
                loadChildren: () =>
                   ( HojavidaModule
                    ),
            },
        ],
    },
    {
        path: '',
        component: ExampleComponent,
    },
];

@NgModule({
    declarations: [ExampleComponent],
    imports: [RouterModule.forChild(exampleRoutes)],
})
export class ExampleModule {}
