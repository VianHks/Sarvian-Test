import type { PageComponent } from '@nxweb/react';

import { Card, CardContent, CardHeader, Grid, Typography } from '@components/material.js';

const Home: PageComponent = () => {
  return (
    <Grid container={true} spacing={6}>
      <Grid item={true} xs={12}>
        <Card>
          <CardHeader title="Kick start your project 🚀" />
          <CardContent>
            <Typography sx={{ mb: 2 }}>All the best for your new project.</Typography>
            <Typography>
              Please make sure to read our Template Documentation to understand where to go from here and how to use our
              template.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

Home.displayName = 'Home';

export default Home;
