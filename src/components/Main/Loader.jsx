/**
    Colored loading component to indicate page load or information fetch.

    @author PatrickBrown1
 */

import React from 'react'

import CircularProgress from '@material-ui/core/CircularProgress'
import '../../constants/colorPalette.css'

const Loader = () => <CircularProgress style={{ color: '--lightpurple', margin: '150px 0' }} />

export default Loader
