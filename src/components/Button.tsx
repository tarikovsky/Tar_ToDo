//две кнопки: Кнопка удаления и кнопка чекбокса


import '../Button.scss'

interface IButtonReadyProps{
    complete:boolean;
    id:string;
    changeComplete: (id:string)=>void;
}


interface IButtonDeleteProps{
    deleteItem: ()=>void;
}

const ButtonReady: React.FC<IButtonReadyProps> = ({complete, id, changeComplete}) => {

    return <label className="toggler-wrapper style-18">
        <input className={`${complete ? "checked" : ""}`} onClick={()=>changeComplete(id)} type="checkbox" />
        <div className="toggler-slider">
            <div className="toggler-knob"></div>
        </div>
    </label>
}

const ButtonDelete: React.FC<IButtonDeleteProps> = ({deleteItem}) => {
    return <div onClick={()=>deleteItem()} className="cl-btn-7">
    </div>
}

export { ButtonReady , ButtonDelete}