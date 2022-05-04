import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Tab, Grid, Header, Card } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import ProfileCard from './ProfileCard';


export default observer(function ProfileFollowings() {
    const { profileStore } = useStore();
    const { profile, followings, loadFollowings, loadingFollowings, activeTab } = profileStore;
    useEffect(() => {
        const predicate = activeTab === 4 ? 'following' : 'followers';
        loadFollowings(predicate);
    }, [loadFollowings])

    return (
        <Tab.Pane loading={loadingFollowings}>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' icon='user' content={activeTab === 4 ? `People followed by ${profile?.displayName}` : `People following ${profile?.displayName}`} />
                </Grid.Column>
                <Grid.Column width={16}>
                    <Card.Group itemsPerRow={4}>
                        {followings.map(f => (
                            <ProfileCard key={f.username} profile={f} />
                        ))}
                    </Card.Group>

                </Grid.Column>


            </Grid>
        </Tab.Pane>
    )


})