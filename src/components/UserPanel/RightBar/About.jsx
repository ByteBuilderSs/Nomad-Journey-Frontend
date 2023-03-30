import {
    Grid,
    Button,
    Divider,
    Card,
    Chip,
    Stack,
    Typography
} from '@mui/material';
import LabelIcon from '@mui/icons-material/Label';
function About() {
    return(
        <>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
                <Grid item xs={12}>
                    <h3 style={{ display: "flex", alignItems: "center", marginTop: "1.5rem", marginLeft: "1rem", marginBottom: "1rem" }}>
                        ABOUT ME
                    </h3>
                    <Divider sx={{ borderBottomWidth: 3, width: "150rem"}}/>
                </Grid>
                {/* */}
                <Grid item xs={12} sx={{ marginLeft: "2rem", marginTop: "1rem" }}>
                    <Typography component="p" sx={{ width: "70%" }} >
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                        Non ad corrupti perspiciatis doloribus consectetur beatae quam veniam voluptas iusto officiis cupiditate
                        omnis quae reiciendis voluptatibus reprehenderit, consequuntur vero rem architecto!
                    </Typography>
                </Grid>
                {/* */}
                <Grid item xs={12} sx={{ marginLeft: "2rem", marginTop: "1rem" }}>
                    <Typography component="h4" sx={{ fontWeight: "bold", marginBottom: "1rem" }}>Why I'm on Nomad Journey</Typography>
                    <Typography component="p" sx={{ width: "70%" }} >
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                        Non ad corrupti perspiciatis doloribus consectetur beatae quam veniam voluptas iusto officiis cupiditate
                        omnis quae reiciendis voluptatibus reprehenderit, consequuntur vero rem architecto!
                    </Typography>
                </Grid>
                {/* */}
                <Grid item xs={12} sx={{ marginLeft: "2rem", marginTop: "1rem" }}>
                    <Typography component="h4" sx={{ fontWeight: "bold", marginBottom: "1rem" }}>Interests</Typography>
                    <Stack direction="row" spacing={1}>
                        <Chip label="Animals" variant="outlined" color="primary"/>
                        <Chip label="Travelling" variant="outlined" color="primary"/>
                    </Stack>
                </Grid>
                {/* */}
                <Grid item xs={12} sx={{ marginLeft: "2rem", marginTop: "1rem" }}>
                    <Typography component="h4" sx={{ fontWeight: "bold", marginBottom: "1rem" }}>Music, Movies, and Books</Typography>
                    <Typography component="p" sx={{ width: "70%" }} >
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                        Non ad corrupti perspiciatis doloribus consectetur beatae quam veniam voluptas iusto officiis cupiditate
                        omnis quae reiciendis voluptatibus reprehenderit, consequuntur vero rem architecto!
                    </Typography>
                </Grid>
                {/* */}
                <Grid item xs={12} sx={{ marginLeft: "2rem", marginTop: "1rem" }}>
                    <Typography component="h4" sx={{ fontWeight: "bold", marginBottom: "1rem" }}>One Amazing Thing I’ve Done</Typography>
                    <Typography component="p" sx={{ width: "70%" }} >
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                        Non ad corrupti perspiciatis doloribus consectetur beatae quam veniam voluptas iusto officiis cupiditate
                        omnis quae reiciendis voluptatibus reprehenderit, consequuntur vero rem architecto!
                    </Typography>
                </Grid>
                {/* */}
                <Grid item xs={12} sx={{ marginLeft: "2rem", marginTop: "1rem" }}>
                    <Typography component="h4" sx={{ fontWeight: "bold", marginBottom: "1rem" }}>Teach, Learn, Share</Typography>
                    <Typography component="p" sx={{ width: "70%" }} >
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                        Non ad corrupti perspiciatis doloribus consectetur beatae quam veniam voluptas iusto officiis cupiditate
                        omnis quae reiciendis voluptatibus reprehenderit, consequuntur vero rem architecto!
                    </Typography>
                </Grid>
                {/* */}
                <Grid item xs={12} sx={{ marginLeft: "2rem", marginTop: "1rem", marginBottom: "1rem" }}>
                    <Typography component="h4" sx={{ fontWeight: "bold", marginBottom: "1rem" }}>What I Can Share with Hosts</Typography>
                    <Typography component="p" sx={{ width: "70%" }} >
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                        Non ad corrupti perspiciatis doloribus consectetur beatae quam veniam voluptas iusto officiis cupiditate
                        omnis quae reiciendis voluptatibus reprehenderit, consequuntur vero rem architecto!
                    </Typography>
                </Grid>

            </Grid>
        </>
    );
}

export default About;