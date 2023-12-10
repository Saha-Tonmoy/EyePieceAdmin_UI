import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import { apiBaseUrl, api_AuthURL, api_UserName, api_Password } from 'Constants/Constant';
import axios from 'axios';
// import { fetchContactLensRepository } from './ContactLensService/svcContactLensService';

function ContactLens() {
    const [ContactLensList, setContactLensList] = useState([]);
    const [empGID, setempGID] = useState('ts');
    const [RoleId, SetRoleId] = useState(1);

    // useEffect(() => {
    //     GetContactLensRepository();
    // }, []);

    const GetContactLensRepository = async () => {
        // const url = apiBaseUrl + api_AuthURL;
        // const param_data = { userName: api_UserName, password: api_Password };

        try {
            const response = await axios.post(url, param_data);
            // fetchContactLensRepository(response.data, empGID, RoleId).then((res) => {
            //     console.log(res);
            //     setContactLensList(res);
            // });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia sx={{ height: 140 }} image="/static/images/cards/contemplative-reptile.jpg" title="green iguana" />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except
                    Antarctica
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}
export default ContactLens;
