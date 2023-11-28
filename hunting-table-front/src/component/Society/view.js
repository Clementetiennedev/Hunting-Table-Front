import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import HuntingTableService from '../../service/HuntingTableService';

const SocietyDetails = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [society, setSociety] = useState(null);
    const [federation, setFederation] = useState(null);
    const [seasons, setSeasons] = useState([]);

    useEffect(() => {
        HuntingTableService.getSociety(id)
            .then((res) => {
                setSociety(res.data);
                HuntingTableService.getFederationById(res.data.federation_id)
                .then((res) => {
                    setFederation(res.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                });
            })
            .catch((error) => {
                console.log(error);
            });

        HuntingTableService.getSeasonBySocietyId(id)
        .then(response => setSeasons(response.data.seasons))
        .catch(error => console.error('Error fetching seasons:', error));
    }, [id]);

    return (
        <Container maxWidth="xl" sx={{ my: 2 }}>
            {loading ? (
                <Stack spacing={1}>
                    <Skeleton variant="text" width={100} />
                    <Skeleton variant="text" width={300} />
                    <Skeleton variant="text" width={200} />
                    <Skeleton variant="rectangular" height={118} />
                </Stack>
            ) : (
                <React.Fragment>
                <div>       
                    <h2 style={{
                        textAlign: 'center', marginTop: '8%',
                    }}>Test {society.name}</h2>
                </div>

                <br></br>
                <Card sx={{ boxShadow: 4 }}>
                    <CardContent>
                        <p>
                            <b>Description :</b> {society.description}
                        </p>
                        <p>
                            <b>Téléphone :</b> {society.phone}
                        </p>
                        <p>
                            <b>Fédération :</b> {federation.name}
                        </p>
                        <p>
                            <b>Département :</b> {federation.department}
                        </p>
                    </CardContent>
                </Card>
                <br></br>
                <h2>Quotas</h2>
                {seasons.map(season => (
                    <Card key={season.id}>
                      <CardContent>
                        <p>
                          <b>{season.title}</b>
                        </p>
                        <p>
                          <b>Espèce :</b> {season.animal}
                        </p>
                        <p>
                          <b>Nombre d'animaux à prélever :</b> {season.quota}
                        </p>
                        <p>
                            <b>Début de saison :</b> {season.dateDebut}
                        </p>
                        <p>
                            <b>Fin de saison :</b> {season.dateFin}
                        </p>
                      </CardContent>
                    </Card>
                ))}
     
              </React.Fragment>
            )}
        </Container>
    );
};

export default SocietyDetails;