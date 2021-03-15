  
# SelectC8

SelectC8 es una librería que hace el uso del elemento select más sencillo.

>*La idea base de este componente es llenar de manera dinámica los controles select en tu aplicación, centralizando código y haciendo tus llamadas más limpias, puedes utilizarlo >dentro de peticiones ajax, o en tu funciones con json listos para ser utilizados.*

## Demo
Si deseas ver mas a detalle el uso de esta librería, puedes visitar  [SelectC8](https://jacms.github.io/Select-C8).
 
 ``` javascript
 const fruits = [{
                id: 1,
                name: "Apple"
            },
            {
                id: 2,
                name: "Banana"
            },
            {
                id: 3,
                name: "Grapes"
            },
            {
                id: 4,
                name: "Watermelon"
            }
        ];
        
  let selectC8_e1 = new SelectC8({
            element: "example1",
            data: fruits,
            valueProperty: "id",
            textProperty: "name",
        });
        
  selectC8_e1.fill();
```
 
## Creditos
* Concept and development by [jacms](https://github.com/jacms).
