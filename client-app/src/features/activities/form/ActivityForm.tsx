import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';


export default observer(function ActivityForm() {
    const history = useHistory();
    const { activityStore } = useStore();
    const { createActivity, updateActivity, loading, loadActivity, loadingInitial } = activityStore;
    // const { selectedActivity, closeForm, createActivity, updateActivity, loading } = activityStore;
    const [target, setTarget] = useState('');
    const { id } = useParams<{ id: string }>();

    const [activity, setActivity] = useState({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!));
    }, [id, loadActivity]);


    function handleSubmit(e?: SyntheticEvent<HTMLButtonElement>) {
        if (e) {
            setTarget(e.currentTarget.name)
        }
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity).then(() => {
                history.push(`/activities/${newActivity.id}`)
            });
        } else {
            updateActivity(activity).then(() => {
                history.push(`/activities/${activity.id}`)
            })
        }

    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value });
    }

    if (loadingInitial) return <LoadingComponent content='Loading activity...'></LoadingComponent>

    return (
        <Segment clearing>
            <Form onSubmit={() => handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange} />
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange} />
                <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={handleInputChange} />
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange} />
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange} />
                <Button name={activity.id} loading={loading && target === activity.id} onClick={(e) => handleSubmit(e)} floated='right' positive type='submit' content='Submit' />
                <Button as={Link} to='/activities' floated='right' type='button' content='Cancel' />
                {/* <Button onClick={closeForm} floated='right' type='button' content='Cancel' /> */}
            </Form>
        </Segment>
    )
});