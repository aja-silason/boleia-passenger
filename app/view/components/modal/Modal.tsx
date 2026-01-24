import { ReactNode } from "react";
import { Modalize } from "react-native-modalize";

type props = {
    ref: any;
    height?: number;
    maxHeight?: number;
    component: ReactNode;
}

export const Modal = (props: props) => {
    return (
        <Modalize
            ref={props.ref}
            snapPoint={props.height}
            modalHeight={props.maxHeight}
        >
            {props.component}
        </Modalize>
    )
}