import { ReactNode } from "react";
import { Modalize } from "react-native-modalize";

type props = {
    ref: any;
    height?: number;
    maxHeight?: number;
    component: ReactNode;
    onClose?: VoidFunction;
}

export const Modal = (props: props) => {
    return (
        <Modalize
            onClose={props.onClose}
            ref={props.ref}
            snapPoint={props.height}
            modalHeight={props.maxHeight}
        >
            {props.component}
        </Modalize>
    )
}