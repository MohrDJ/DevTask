import React from 'react';
import Select, { ClearIndicatorProps, GroupBase, components, ActionMeta } from 'react-select';

export interface CustomOption {
    value: string;
    label: string;
    description: string;
}

export const Option = (props: any) => {
    return (
        <components.Option {...props}>
            <div
                style={{
                    whiteSpace: 'pre-wrap',
                }}
            >
                <div>
                    <span className="font-bold">{props.data.label}</span>
                </div>
                <div className="font-serif">{props.data.description}</div>
            </div>
        </components.Option>
    );
};

export const ClearIndicator = (props: React.JSX.IntrinsicAttributes & ClearIndicatorProps<unknown, boolean, GroupBase<unknown>>) => {
    return (
        components.ClearIndicator && (
            <components.ClearIndicator {...props}>
                <div
                    onClick={props.clearValue}
                    style={{
                        cursor: 'pointer',
                        color: '#0074cc',
                    }}
                >
                    Limpar
                </div>
            </components.ClearIndicator>
        )
    );
};

export const CustomSelect = ({
    id,
    options,
    value,
    onChange,
    isSearchable,
    styles,
    placeholder,
}: {
    id: string;
    options: CustomOption[];
    value: any;
    onChange: any;
    isSearchable: boolean;
    styles: any;
    placeholder: string;
}) => {
    return (
        <Select
            id={id}
            options={options}
            value={value}
            onChange={onChange}
            components={{ ClearIndicator, Option }}
            isSearchable={isSearchable}
            styles={{
                ...styles,
                control: (provided: any, state: any) => ({
                    ...provided,
                    backgroundColor: '#2f2e2e',
                    padding: '0.25rem 0',
                    cursor: 'pointer',
                    boxShadow: state.isSelected ? '0.9rem 0.9rem 1.7rem rgb(37 99 235)' : 'none',
                }),
                option: (provided: any, state: any) => ({
                    ...provided,
                    backgroundColor: state.isSelected ? '#2f2e2e' : '#2f2e2e',
                    color: state.isSelected ? 'white' : 'gray',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                    ':hover': {
                        backgroundColor: '#0074cc',
                        borderRadius: '0.4rem',
                    },
                }),
                placeholder: (provided) => ({
                    ...provided,
                    color: 'white',
                    fontWeight: 'bold',
                }),
                singleValue: (provided: any) => ({
                    ...provided,
                    color: 'white',
                }),
                menu: (provided) => ({
                    ...provided,
                    overflowY: 'hidden',
                }),
                menuList: (provided) => ({
                    ...provided,
                    backgroundColor: '#2f2e2e',
                }),
            }}
            placeholder={placeholder}
        />
    );
};

export const customStyles = {

    option: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#2f2e2e' : '#2f2e2e',
        color: state.isSelected ? 'white' : 'gray',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        ':hover': {
            backgroundColor: '#0074cc',
        },
    }),


    control: (provided: any) => ({
        ...provided,
        backgroundColor: '#2f2e2e',
        padding: '0.25rem 0',
        cursor: 'pointer',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    }),

    singleValue: (provided: any) => ({
        ...provided,
        color: 'white',
    }),
};
