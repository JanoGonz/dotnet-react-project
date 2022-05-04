import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';
import { UserActivity } from '../../app/models/userActivity';

interface Props {
    activity: UserActivity;
}

export default observer(function ActivityCard({ activity }: Props) {
    const truncate = ((desc: string | undefined) => {
        if (desc) {
            if (desc.length > 40) {
                return desc.substring(0, 37) + '...';
            }
            return desc;
        }

    })
    return (
        <Card as={Link} to={`/activities/${activity.id}`}>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Description>{truncate(activity.description)}</Card.Description>
            </Card.Content>
        </Card>
    )
})