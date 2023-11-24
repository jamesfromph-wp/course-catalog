import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "./assets/css/main.css";

import {
  Box,
  Tab,
  Tabs,
  Typography,
  Grid,
  Pagination,
  Fade,
} from "@mui/material";
import { useState, useEffect } from "react";

import Course from "components/Course";

// assets
import StarIcon from "@mui/icons-material/Star";
import CourseModal from "components/CourseModal";

function App() {
  const fieldsCourse = [
    "@default",
    "caption_languages",
    "checkout_url",
    "description",
    "discount_price",
    "enroll_url",
    "has_closed_caption",
    "instructional_level",
    "image_750x422",
    "is_organization_eligible",
    "last_update_date",
    "num_reviews",
    "num_subscribers",
    "preview_url",
    "price",
    "primary_category",
    "primary_subcategory",
    "rating",
    "requirements_data",
    "target_audiences",
    "what_you_will_learn_data",
    "who_should_attend_data",
    "content_info",
    "context_info",
    "-locale",
  ];

  const [state, setState] = useState({
    loaded: false,

    tabIndex: 0,
    ordering: "relevance",
    loading: false,

    request: `https://www.udemy.com/api-2.0/courses/?ordering=relevance&fields[course]=${fieldsCourse.join(
      ","
    )}`,
    requestNext: null,
    requestPrev: null,
    requestAggregations: [],

    category: "General",
    subcategory: null,

    pageCount: 10000,
    pageCurrent: 1,
    pageRow: 12,
  });

  const [course, setCourse] = useState<any>(null);
  const [courses, setCourses] = useState([]);

  const getCourses = (initial = true) => {
    if (!initial || (initial && !state.loaded)) {
      setState((prev) => ({ ...prev, loading: true }));

      fetch(state.request, {
        method: "GET",
        headers: {
          Authorization: `Basic ${btoa(
            `${process.env.REACT_APP_UDEMY_CLIENT}:${process.env.REACT_APP_UDEMY_SECRET}`
          )}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setState((prev) => ({
            ...prev,
            loaded: true,

            requestNext: data?.next,
            requestPrev: data?.previous,
            requestAggregations: data?.aggregations,

            pageCount: data?.count,
          }));

          setCourses(data?.results);

          console.log(data);
        })
        .finally(() => setState((prev) => ({ ...prev, loading: false })));
    }
  };

  useEffect(() => getCourses(false), [state.request]);

  useEffect(
    () =>
      setState((prev) => {
        const temp = { ...prev };

        temp.request = `https://www.udemy.com/api-2.0/courses/?ordering=${
          temp.ordering
        }&fields[course]=${fieldsCourse.join(",")}`;

        return temp;
      }),
    [state.ordering]
  );

  useEffect(() => {
    setState((prev) => {
      const temp = { ...prev };

      temp.request = `https://www.udemy.com/api-2.0/courses/?ordering=${
        temp.ordering
      }&fields[course]=${fieldsCourse.join(",")}&page=${temp.pageCurrent}`;

      return temp;
    });
  }, [state.pageCurrent]);

  return (
    <>
      <Box sx={{ paddingX: 4, marginTop: 4 }}>
        <Box className="d-flex align-items-baseline">
          <Typography sx={{ fontSize: "42px", fontWeight: "bold" }}>
            {state.category} Courses
          </Typography>

          <Typography
            sx={{
              color: "#00000080",
              fontSize: "26px",
              paddingLeft: 2,
              marginLeft: 2,
              borderLeft: "1px solid #000",
            }}
          >
            {state.subcategory}
          </Typography>
        </Box>

        <Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>
          Courses to get you started
        </Typography>
      </Box>

      <Box sx={{ marginTop: 4 }}>
        <Box
          sx={{
            position: "sticky",
            top: 0,
            backgroundColor: "#FFF",
            borderBottom: 1,
            borderColor: "divider",
            paddingX: 2,
            zIndex: 1,
          }}
        >
          <Tabs
            value={state.tabIndex}
            onChange={($event, $value) =>
              setState((prev) => {
                const temp = { ...prev };

                temp.tabIndex = $value;

                if ($value === 0) temp.ordering = "relevance";
                if ($value === 1) temp.ordering = "newest";
                if ($value === 2) temp.ordering = "most-reviewed";

                return temp;
              })
            }
          >
            <Tab label="Most Popular 🏆" />
            <Tab label="New ✨" />
            <Tab label="Trending 🔥" />
          </Tabs>
        </Box>

        <Box
          className="d-flex flex-column"
          sx={{ position: "relative", minHeight: "100vh", paddingX: 4 }}
        >
          <Grid container spacing={5} marginTop={0}>
            {courses?.map((item: any, index: number) => (
              <Grid key={index} item xs={3}>
                <Course source={item} onClick={() => setCourse(item)} />
              </Grid>
            ))}
          </Grid>

          <Box
            className="d-flex align-items-center justify-content-end"
            sx={{ marginTop: 4, paddingBottom: 4 }}
          >
            <Pagination
              count={Math.floor(state.pageCount / state.pageRow)}
              page={state.pageCurrent}
              onChange={($event, $value) =>
                setState((prev) => ({ ...prev, pageCurrent: $value }))
              }
            />
          </Box>

          <Fade in={state.loading} mountOnEnter unmountOnExit>
            <Box
              className="loader w-100 h-100"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                backgroundColor: "#00000080",
              }}
            />
          </Fade>
        </Box>
      </Box>

      <CourseModal
        show={Boolean(course)}
        source={course}
        onClose={() => setCourse(null)}
      />
    </>
  );
}

export default App;
