
import { ITodo } from "../types/data"
import { TodoItem } from "./ToDoItem";

interface IToDoListProps {
    changeText: (id: string, text: string) => void;
    items: ITodo[];
    removeToDo: (id: string) => void;
    changeComplete: (id: string) => void;
    scroll_hide_input: () => void;
}

const ToDoList: React.FC<IToDoListProps> = (props) => {
    const { changeText, changeComplete, removeToDo, items, scroll_hide_input } = props;
    return <ul onScroll={scroll_hide_input} className="list">
        {
            items.length > 0
                ?
                items.map((item, i) =>
                    <TodoItem
                        key={item.id}
                        changeText={changeText}
                        {...item}
                        removeToDo={removeToDo}
                        changeComplete={changeComplete}
                    />)
                :
                <div className="noToDo">
                    <img src="/images/del_net.png" alt="Нет дел" />
                    <p>Самое время добавить ваши TODO-шки!</p>
                </div>}
    </ul>
}

export { ToDoList }