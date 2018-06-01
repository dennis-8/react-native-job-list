import axios from "axios";
import reverseGeocode from "latlng-to-zip";
import qs from "qs";

import * as types from "./types";

const JOB_QUERY_PARAMS = {
  publisher: "4201738803816157",
  format: "json",
  v: "2",
  latlong: 1,
  radius: 10,
  q: "javascript"
};

const SEARCH_URL = "http://api.indeed.com/ads/apisearch?";

const buildJobsUrl = zip => {
  const query = qs.stringify({
    ...JOB_QUERY_PARAMS,
    l: zip
  });

  return `${SEARCH_URL}${query}`;
};

export const fetchJobs = region => {
  return async dispatch => {
    // convert region to zip code
    try {
      let zip = await reverseGeocode(region);

      const url = buildJobsUrl(zip);

      let { data } = await axios.get(url);

      dispatch({
        type: types.FETCH_JOBS,
        payload: data
      });

      console.log(data);
    } catch (error) {
      console.log("error", error);
    }
  };
};