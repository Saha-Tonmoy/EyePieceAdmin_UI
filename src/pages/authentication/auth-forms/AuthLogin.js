import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux'
import { AES, enc } from 'crypto-js';

// material-ui
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  TextField
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import FirebaseSocial from './FirebaseSocial';
import AnimateButton from '../../../components/@extended/AnimateButton';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

import { useNavigate } from "react-router-dom"

import { login } from '../../../store/reducers/EmployeeReducer';
import { FetchToken } from '../../../Services/svcTokenService';
import { fetchUserDetails } from '../../../Services/svcLoginService';

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = () => {
  const [checked, setChecked] = React.useState(false);

  const [UserGID, setUserGID] = useState("");
  const [UserPassword, setUserPassword] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const OnLoginClick = async (event) => {
    event.preventDefault();
    debugger;
    try {
      FetchToken().then((response) => {
        fetchUserDetails(response, UserGID, UserPassword).then((res) => {
          debugger;
          if (res != null) {
            dispatch(
              login({
                EmployeeName: res.employeeName,
                EmployeeGID: res.empGID,
                StoreCode: res.storeCode
              })
            );

            const encryptedName = AES.encrypt(res.employeeName, "EPKEY");
            const encryptedGID = AES.encrypt(res.empGID, "EPKEY");

            sessionStorage.setItem("EmployeeName", encryptedName.toString());
            sessionStorage.setItem("EmployeeGID", encryptedGID.toString());
            sessionStorage.setItem("user-token", "EyePiece");

            setTimeout(() => {
              navigate('/');
            }, 500);
          } else {
            sessionStorage.clear();
          }
        })
      })
      setSubmitting(false);
    } catch (err) {
      sessionStorage.clear();
      setSubmitting(false);
    }
  }

  return (
    <>
      <Formik>
        <form noValidate onSubmit={OnLoginClick}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <TextField
                  value={UserGID}
                  name="UserGID"
                  onChange={(event) => { setUserGID(event.target.value) }}
                  placeholder="Enter Employee GID"
                  fullWidth
                  variant="outlined"
                />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <TextField
                  value={UserPassword}
                  name="UserPassword"
                  type='password'
                  onChange={(event) => { setUserPassword(event.target.value) }}
                  placeholder="Enter Password"
                  fullWidth
                  variant="outlined"
                />
              </Stack>
            </Grid>

            <Grid item xs={12} sx={{ mt: -1 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={(event) => setChecked(event.target.checked)}
                      name="checked"
                      color="primary"
                      size="small"
                    />
                  }
                  label={<Typography variant="h6">Keep me sign in</Typography>}
                />
                <Link variant="h6" component={RouterLink} to="" color="text.primary">
                  Forgot Password?
                </Link>
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                  Login
                </Button>
              </AnimateButton>
            </Grid>
            <Grid item xs={12}>
              <Divider>
                <Typography variant="caption"> Login with</Typography>
              </Divider>
            </Grid>
            <Grid item xs={12}>
              <FirebaseSocial />
            </Grid>
          </Grid>
        </form>
      </Formik>
    </>
  );
};

export default AuthLogin;
