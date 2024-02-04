import { useDispatch, useSelector } from 'react-redux'
import { addEntity, sortCircuit, deleteEntity } from "../../store/modules/dashboard/actions"
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import { Typography } from '@mui/material'
import './style.css'

import barra from '../../assets/barra.png'
import gerador from '../../assets/gerador.png'
import linha from '../../assets/linha.png'
import transformador from '../../assets/transformador.png'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const componentsSymbol: { id: number, name: string, img: string }[] = [
    {
        id: 0,
        name: 'barra',
        img: barra
    },
    {
        id: 1,
        name: 'gerador',
        img: gerador
    },
    {
        id: 2,
        name: 'linha',
        img: linha
    },
    {
        id: 3,
        name: 'transformador',
        img: transformador
    }
];

export const ElectricalComponents = () => {
    const dispatch = useDispatch()
    const entities = useSelector((state: any) => state.circuit)

    const addComponent = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const entity = event.currentTarget as HTMLInputElement
        const entityValue = entity.value

        const index = componentsSymbol.map(currentValue => currentValue.name).indexOf(entityValue);
        const id = entities.length + 1
        const component = entities[entities.length - 1]?.entity
        const imgEntity = componentsSymbol[index]?.img

        if (entityValue === 'gerador') {
            if (component === 'linha') return
            if (component === 'transformador') return
            if (component === 'gerador') return

            createEntity(id, entityValue, imgEntity)
            toast.success("Componente inserido com sucesso!");
        } else if (entityValue === 'linha' || entityValue === 'transformador') {
            if (component === 'barra') {
                createEntity(id, entityValue, imgEntity)
                toast.success("Componente inserido com sucesso!");
            }
        } else if (entityValue === 'barra') {
            createEntity(id, entityValue, imgEntity)
            toast.success("Componente inserido com sucesso!");
        } else {
            toast.error("Componente não pode ser adicionado!");
        }
    }

    async function createEntity(id: string, value: string, img: string) {
        const objEntity = {
            id: id,
            entity: value,
            img: img
        }

        const result = await addEntity(objEntity)
        dispatch(result)
    }

    const handleOnDragEnd = async (item: any) => {
        if (!item.destination) return;

        const index = item.source.index
        const items: any[] = Array.from(entities)
        const [reorderedItem] = items.splice(item.source.index, 1);
        items.splice(item.destination.index, 0, reorderedItem);

        const indexSource = Number(item.source.index)
        const indexDestination = Number(item.destination.index)

        if (entities[indexSource]?.entity === 'linha' ||
            entities[indexSource]?.entity === 'transformador') {
            if (items[indexDestination - 1]?.entity === 'barra' &&
                items[indexDestination + 1]?.entity === 'barra') {
                const result = await sortCircuit([...items], index)
                dispatch(result)

                toast.success("Componente editado com sucesso!");
            } else {
                toast.error("Componente não pode ser editado.");
            }
        }

        if (entities[indexSource]?.entity === 'gerador') {
            if ((items[indexDestination - 1]?.entity === 'barra' ||
                items[indexDestination - 1]?.entity === undefined) &&
                items[indexDestination + 1]?.entity === 'barra') {
                const result = await sortCircuit([...items], index)
                dispatch(result)

                toast.success("Componente editado com sucesso!");
            } else {
                toast.error("Componente não pode ser editado.");
            }
        }
    }

    const deleteComponent = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const entity = event.currentTarget as HTMLInputElement
        const entityId = entity.id

        const result = await deleteEntity(entities[entityId].id)
        dispatch(result)

        entities.splice(entityId, 1)
        dispatch(await sortCircuit([...entities], entityId))

        toast.success("Componente deletado!");
    }

    return (
        <div className='container'>
            <div className='aside-components'>
                <Typography variant="h5" component="p">Lista de Componentes</Typography>
                {componentsSymbol.map((component: any, index: any) => {
                    return <Button
                        key={index}
                        id={component.name}
                        value={component.name}
                        onClick={addComponent}>
                        <img
                            className='img-components'
                            src={component.img}
                            alt={component.name}
                        />
                    </Button>
                })}
            </div>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable
                    droppableId="entitiesList"
                    direction="horizontal">
                    {(provided) => (
                        <div
                            className="entitiesList"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {entities.map((item: any, index: any) => {
                                return (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id.toString()}
                                        index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <div className='box-circuit'>
                                                    <img
                                                        className='circuit-component'
                                                        src={item.img}
                                                        alt={item.name}
                                                    />
                                                    <Button
                                                        onClick={deleteComponent}
                                                        id={index}
                                                        value={item.id}
                                                        size="small"
                                                    >
                                                        <DeleteIcon />
                                                    </Button>
                                                </div>
                                            </div>)}
                                    </Draggable>)
                            })}
                            {provided.placeholder}
                        </div>)}
                </Droppable>
            </DragDropContext>
        </div >)
}