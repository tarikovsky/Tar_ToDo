import { useState } from "react";
import { ITodo } from "../types/data"


interface IProgress_barProps {
    items: ITodo[]
}

const Progress_bar: React.FC<IProgress_barProps> = (props) => {
    const { items } = props;
    var totalLength = items.length;
    var passedLength: number = 0;

    //подсчет количества выполненных ТуДу-шек
    items.map((item) => {
        if (item.complete === true) {
            passedLength += 1;
        }
    })
    var passedWidth: number = passedLength / totalLength * 100;
    var notPassedWidth: number = (totalLength - passedLength) / totalLength * 100;
    return <div className={`progress ${totalLength === 0 ? "hide_progress" : ''}`}>
        <div className="top">
        </div>
        <div className="bar">
            <div className="red">
                <div style={{ width: passedWidth + "%" }} className="green">
                </div>
                <div style={{ width: notPassedWidth + "%" }} className="countNotPassed">
                </div>
            </div>
        </div>
    </div>
}

export { Progress_bar }