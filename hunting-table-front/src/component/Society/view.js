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

    useEffect(() => {
        HuntingTableService.getSociety(id)
            .then((res) => {
                setSociety(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
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
                    </CardContent>
                </Card>
                <br></br>

                
              </React.Fragment>
            )}
        </Container>
    );
};

export default SocietyDetails;