import React, { useState } from 'react';
import { Button, Grid, Header, Tab } from 'semantic-ui-react';
import { Profile } from '../../app/models/profile';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';
import ProfileEditForm from './ProfileEditForm';

interface Props {
    profile: Profile;
}

export default observer(function ProfileAbout({ profile }: Props) {
    const { profileStore: { isCurrentUser } } = useStore();
    const [editMode, setEditMode] = useState(false);


    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' icon='user' content={`About ${profile.displayName}`} />
                    {isCurrentUser && (
                        <Button
                            floated='right'
                            basic content={editMode ? 'Cancel' : 'Edit profile'}
                            color={editMode ? 'red' : 'green'}
                            onClick={() => { setEditMode(!editMode) }}
                        />)}
                </Grid.Column>
                <Grid.Column width={16}>
                    {!editMode && (
                        <p>{profile.bio}</p>
                    )}
                    {editMode && isCurrentUser && (
                        <ProfileEditForm setEditMode={setEditMode}/>
                    )}

                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
})