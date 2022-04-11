import React from 'react';
import { Message } from 'semantic-ui-react';

interface Props {
    errors: string[] | null;
}

export default function ValidationErrors(props: Props) {
    return (
        <Message error>
            {props.errors && (
                <Message.List>
                    {props.errors.map((err: any, i) => (
                        <Message.Item key={i}>{err}</Message.Item>
                    ))}
                </Message.List>
            )}
        </Message>
    )
}