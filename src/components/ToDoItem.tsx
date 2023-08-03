
import { useRef, useState, useEffect } from "react";
import { ITodo } from "../types/data"
import { ButtonDelete, ButtonReady } from "./Button";

interface IToDoItemProps extends ITodo {
    changeText: (id: string, text: string) => void;
    removeToDo: (id: string) => void;
    changeComplete: (id: string) => void;
}

const TodoItem: React.FC<IToDoItemProps> = (props) => {
    const { changeText, id, title, complete, date, removeToDo, changeComplete } = props;
    const [del, setDel] = useState(false);
    const [value, setValue] = useState(title);
    const textRef = useRef<HTMLTextAreaElement>(null);
    const [isEdit, setIsEdit] = useState(false);


    //изменение поля под размер текста при запуске страницы
    useEffect(() => {
        resize();
    }, [])

    //изменение поля под размер текста
    function resize() {
        setTimeout(() => {
            if (textRef.current) {
                textRef.current.style.height = 'auto';
                const newSize = textRef.current.scrollHeight - 30;
                textRef.current.style.height = newSize + 'px';
            }
        }, 0)
    }

    const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        if (!((value === '') && e.target.value[e.target.value.length - 1] === '\n'))
            setValue(e.target.value);
    }

    //установка измененного текста
    const setValueToToDos = () => {
        changeText(id, value);
        changeIsEdit(false);
    }


    //установка измененного текста при нажатии на интер
    const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            setValueToToDos();
        }
        resize();
    }

    //удадение Ту-Душки
    const deleteItem = () => {
        setDel(true);
        removeToDo(id);
        console.log(id);
        setTimeout(() => setDel(false), 300);
        console.log("i want to delete", id);
    }

    //Месяца для красивого отображения
    const months = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря',
    ];

    //красивое отображение даты, перевод из Date в строку
    const setTime = (date: Date) => {
        var hours = date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`
        var minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`
        var seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : `${date.getSeconds()}`
        return `${hours}:${minutes}:${seconds}`;
    }

    //изменение фона и курсора при редактировании
    const changeIsEdit = (i: boolean) => {
        setIsEdit(i);
        if (textRef.current) {
            textRef.current.readOnly = !i;
            if (i === true) {
                textRef.current.style.cursor = "text"
                textRef.current.style.backgroundColor = "#353535";
                textRef.current.focus();
            }
            else {
                textRef.current.style.cursor = "default";
                textRef.current.style.backgroundColor = "#2a2a2a";
            }
        }
    }
    return <li id={id}>
        <ButtonDelete deleteItem={deleteItem} />
        <div className="date_box">
            <p>{`${date.getDate()} ${months[date.getMonth()]} `}</p>
            <p>{setTime(date)}</p>
        </div>

        <textarea
            readOnly
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            ref={textRef}
            className="text"
            value={value}
            rows={1} cols={5}>
        </textarea>
        <button className={`buttonEdit edit ${isEdit ? "hide" : ""}`} onClick={() => changeIsEdit(true)} />
        <button className={`buttonEdit accept ${!isEdit ? "hide" : ""}`} onClick={setValueToToDos} />

        <ButtonReady complete={complete} id={id} changeComplete={changeComplete} />
    </li>
}

export { TodoItem }