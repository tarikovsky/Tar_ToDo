import { useState, useRef, useEffect } from "react";
import { ITodo } from "../types/data";
import { nanoid } from 'nanoid';
import { ToDoList } from "./ToDoList";
import '../App.scss'
import { Progress_bar } from "./Progress_bar";
const App: React.FC = () => {


  //функция взаимодействия с localStorage
  function useLocalStorage<T>(initialValue: ITodo[], key: string): [ITodo[], React.Dispatch<React.SetStateAction<ITodo[]>>] {

    const getValue = () => {
      const storage = localStorage.getItem(key);

      if (storage) {
        var parsedString = JSON.parse(storage);
        parsedString.map((item: ITodo) => (
          item.date = new Date(item.date)
        ))
        return parsedString;
      }
      return initialValue;
    };

    const [value, setValue] = useState<ITodo[]>(getValue);

    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
    }, [value]);

    return [value, setValue];
  }

  const [toDos, setToDos] = useLocalStorage<[ITodo[], string]>([], "ToDos");
  const [value, setValue] = useState('');
  const idSize = 8;
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [showInput, setShowIput] = useState(true);

  //Фокусировка на поле ввода при загрузке страницы
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [])

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    if (!((value === '') && e.target.value[e.target.value.length - 1] === '\n'))
      setValue(e.target.value);
  }


  //отправка ToDo-шки по нажатию на Enter
  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      addToDo();
    }
    resize();
  }

  //отправка ToDo-шки
  const addToDo = () => {
    if (value.trim()) {
      var velueTemp = value;
      setValue('');
      setToDos([...toDos, {
        id: nanoid(idSize),
        title: velueTemp,
        complete: false,
        date: new Date()
      }])
      resize();
      var last_elem = document.querySelector("ul > li:last-child");
      if (last_elem)
        last_elem.scrollIntoView({ block: "end", behavior: "smooth" });
    }
  }


  //удаления ТуДу-шки
  const removeToDo = (id: string): void => {
    setToDos(toDos.filter((item) => item.id !== id))
    hideShowInput();
  }

  //изменение статуса выполнения ТуДу-шки
  const changeComplete = (id: string): void => {
    setToDos(toDos.map(item => {
      if (item.id !== id) return item;

      return {
        ...item,
        complete: !item.complete
      }
    }))
    hideShowInput();
  }


  //Редактирование 
  const changeText = (id: string, text: string): void => {
    setToDos(toDos.map(item => {
      if (item.id !== id) return item;

      return {
        ...item,
        title: text
      }
    }))
    hideShowInput();
  }

  //изменение размера поля ввода
  function resize() {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.style.cssText = 'height:auto;';
        const newSize = inputRef.current.scrollHeight - 20;
        inputRef.current.style.cssText = 'height:' + newSize + 'px';
      }
    }, 0)
  }
  var countScroll = 0;
  const hideShowInput = () => {
    setShowIput(false);
    countScroll = 0;
  }

  const scroll_hide_input = () => {
    if (countScroll === 0) {
      hideShowInput();
    }
    countScroll += 1;
  }

  return <div className="wrapper">
    <img className="logo" src="/images/logo.svg" />
    <Progress_bar items={toDos} />
    <ToDoList
      changeText={changeText}
      changeComplete={changeComplete}
      removeToDo={removeToDo}
      items={toDos}
      scroll_hide_input={scroll_hide_input}
    />
    <div className={`input_box ${!showInput ? "hide_input" : ''}`}>
      <button className="hide" onClick={() => hideShowInput()}>Скрыть</button>
      <textarea ref={inputRef} id="text_area" onKeyDown={handleKeyDown} onChange={handleChange} value={value} rows={1} placeholder='Напишите ваше дело...' cols={5}></textarea>
      <button className="addTo" onClick={() => addToDo()}>Добавить</button>
    </div>
    <button className={`${showInput ? "hide_edit" : ''} add`} onClick={e => setShowIput(true)} />
  </div>
}

export default App;