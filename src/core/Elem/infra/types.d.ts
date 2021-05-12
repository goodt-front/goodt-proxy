// import { IDescriptorProps } from '@goodt/core';
// import { descriptor } from './descriptor';

export interface DescriptorProps {
    slot: string;
    position: string;
    display: string;
    width: string;
    widthUnit: string;
    height: string;
    heightUnit: string;
    marginT: string;
    marginR: string;
    marginB: string;
    marginL: string;
    paddingT: string;
    paddingR: string;
    paddingB: string;
    paddingL: string;
    cssClass: string;
    cssStyle: string;
    slotData: Record<string, any>;
}

/*
// check try to extract from `descriptor`
export interface DescriptorProps extends IDescriptorProps<ReturnType<typeof descriptor>> {
}
*/
