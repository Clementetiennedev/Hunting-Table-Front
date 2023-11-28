import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import HuntingTableService from '../../service/HuntingTableService';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const HuntDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [hunt, setHunt] = useState(null);
    const [kills, setKills] = useState([]);

    useEffect(() => {
        HuntingTableService.getHunt(id)
            .then((res) => {
                setHunt(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });

        HuntingTableService.getKillByHuntId(id)
        .then(response => setKills(response.data.kills))
        .catch(error => console.error('Error fetching seasons:', error));
    }, [id]);

    const deleteHunt = () => {
        HuntingTableService.deleteHunt(id)
            .then(() => {
                navigate('/history');
            })
            .catch((error) => {
                console.log(error);
            });
    };

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
                        textAlign: 'center',
                    }}>Journée de Chasse n°{hunt.id}</h2>
                                    <FormControl align="right" sx={{my: 1, mx: 0.5}}>
                        <Button color="warning" variant="outlined" style={{minHeight: '56px'}} onClick={deleteHunt} size="large">Supprimer la journée de chasse</Button>
                </FormControl>
                </div>

                <br></br>
                <Card sx={{ boxShadow: 4 }}>
                    <CardContent>
                        <p>
                            <b>Titre :</b> {hunt.title}
                        </p>
                        <p>
                            <b>Date :</b> {hunt.date}
                        </p>
                        <p>
                            <b>Description :</b> {hunt.description}
                        </p>
                    </CardContent>
                </Card>
                <br></br>
                <div>       
                    <h3>Tableau de chasse</h3>
                </div>
                <TableContainer sx={{ maxWidth: 850 }} component={Card}>
                <Table sx={{ maxWidth: 850 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Espèce</TableCell>
                      <TableCell>Nombre</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {kills.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {row.animal}
                        </TableCell>
                        <TableCell>{row.number}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              </React.Fragment>
            )}
        </Container>
    );
};

export default HuntDetails;