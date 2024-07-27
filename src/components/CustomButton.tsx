
interface CustomBtnTypes{
    btnType?: "submit" | "reset" | "button";
    title?: string;
    styles?: string;
    handleClick?:()=>void;
}

const CustomButton = (props:CustomBtnTypes) => {
    return (
        <button
            type={props.btnType}
            className={`${props.styles} font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px]`}
            onClick={props.handleClick}
        >
            {props.title}
        </button>
    )
}

export default CustomButton
