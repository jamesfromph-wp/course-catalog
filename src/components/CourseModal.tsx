import { Box, Modal, Slide, Typography } from "@mui/material";
import { useEffect, useState } from "react";

// assets
import StarIcon from "@mui/icons-material/Star";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";

export default function CourseModal(props: any) {
  const { show = false, source = {}, onClose = () => {} } = props;

  const [state, setState] = useState({ show: false });

  useEffect(() => {
    console.log("triggered");
    if (show) setState((prev) => ({ ...prev, show: true }));
  }, [show]);

  return (
    <Modal
      open={show}
      // onClose={onClose}
      sx={{
        // paddingTop: 15,
        overflow: "auto",
      }}
    >
      <Box
        id="modal-trigger"
        className="d-flex flex-column"
        onClick={($event: any) => {
          if ($event?.target?.id === "modal-trigger")
            setState((prev) => ({ ...prev, show: false }));
        }}
        sx={{ border: "none", outline: "none", paddingTop: 15 }}
      >
        <Slide
          direction="up"
          in={state.show}
          mountOnEnter
          unmountOnExit
          onExited={() => onClose()}
        >
          <Box
            className="wrapper bg-white d-flex flex-column"
            sx={{ paddingX: 5, paddingY: 15 }}
          >
            <Box className="container d-flex">
              <Box className="d-flex flex-column" sx={{ width: "50%" }}>
                <img
                  src={source?.image_480x270}
                  alt={source?.headline}
                  style={{
                    width: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />

                <Typography
                  sx={{ fontSize: "32px", fontWeight: "bold", marginTop: 4 }}
                >
                  What you'll learn
                </Typography>

                <Box className="d-flex flex-column" marginTop={2}>
                  {source?.what_you_will_learn_data?.items.map((data: any) => (
                    <Box className="d-flex align-items-start" marginTop={1.5}>
                      <CheckOutlinedIcon
                        sx={{
                          color: "green",
                          marginRight: 1.5,
                        }}
                      />

                      <Typography>{data}</Typography>
                    </Box>
                  ))}
                </Box>

                <Typography
                  sx={{ fontSize: "32px", fontWeight: "bold", marginTop: 4 }}
                >
                  Description
                </Typography>

                <Box
                  className="d-flex flex-column"
                  marginTop={2}
                  dangerouslySetInnerHTML={{ __html: source?.description }}
                />

                <Typography
                  sx={{ fontSize: "32px", fontWeight: "bold", marginTop: 4 }}
                >
                  Who this course is for:
                </Typography>

                <Box className="d-flex flex-column" marginTop={2}>
                  {source?.who_should_attend_data?.items.map((data: any) => (
                    <Box className="d-flex align-items-start" marginTop={1.5}>
                      <ArrowForwardOutlinedIcon
                        sx={{
                          color: "green",
                          marginRight: 1.5,
                        }}
                      />

                      <Typography>{data}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              <Box
                className="d-flex flex-column"
                sx={{
                  width: "50%",
                  paddingX: 4,
                  paddingY: 2,
                }}
              >
                <Box
                  className="d-flex flex-column"
                  sx={{
                    position: "sticky",
                    top: "50px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "32px",
                      fontWeight: "bold",
                      lineHeight: 1.3,
                    }}
                  >
                    {source?.title}
                  </Typography>

                  <Typography
                    sx={{ fontSize: "20px", lineHeight: 1.5, marginTop: 2 }}
                  >
                    {source?.headline}
                  </Typography>

                  <Box className="d-flex align-items-center" marginTop={2}>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: "bold",
                        marginRight: 1,
                        marginBottom: -0.3,
                      }}
                    >
                      {Number(source?.rating).toLocaleString(undefined, {
                        minimumFractionDigits: 1,
                        maximumFractionDigits: 1,
                      })}
                    </Typography>

                    <Box className="d-flex align-items-center">
                      {Array.from({ length: 5 }, () => (
                        <StarIcon sx={{ color: "gold", fontSize: "18px" }} />
                      ))}
                    </Box>

                    <Typography sx={{ fontSize: "14px", marginLeft: 1 }}>
                      ({Number(source?.num_reviews).toLocaleString()})
                    </Typography>

                    <Typography sx={{ fontSize: "14px", marginLeft: 1 }}>
                      {Number(source?.num_subscribers).toLocaleString()}{" "}
                      students
                    </Typography>
                  </Box>

                  <Box className="d-flex align-items-baseline" marginTop={1.5}>
                    <Typography
                      sx={{
                        color: "black",
                        fontSize: "15px",
                        lineHeight: 1.3,
                      }}
                    >
                      Created by
                    </Typography>

                    <Typography
                      sx={{
                        color: "grey",
                        fontSize: "15px",
                        lineHeight: 1.3,
                      }}
                    >
                      {source?.visible_instructors?.map((user: any) => (
                        <a
                          href={`https://www.udemy.com${user?.url}`}
                          target="_blank"
                          style={{ marginLeft: "5px", textDecoration: "none" }}
                        >
                          {user?.display_name}
                        </a>
                      ))}
                    </Typography>
                  </Box>

                  <a
                    href={`https://www.udemy.com${source?.url}`}
                    target="_blank"
                    style={{
                      backgroundColor: "#00AAFF",
                      color: "#FFFFFF",
                      fontSize: "20px",
                      padding: "8px 20px",
                      marginTop: "32px",
                      textAlign: "center",
                      textDecoration: "none",
                    }}
                  >
                    Learn more
                  </a>

                  {/* <Box
                  className="d-flex align-items-center justify-content-end"
                  sx={{
                    marginTop: "auto",
                    paddingTop: 2,
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: "#00AAFF",
                      color: "#FFFFFF",
                      fontSize: "12px",
                      padding: "2px 10px",
                    }}
                  >
                    {source?.primary_category?.title}
                  </Box>

                  <Box
                    sx={{
                      backgroundColor: "#FBBC04",
                      color: "#FFFFFF",
                      fontSize: "12px",
                      padding: "2px 10px",
                      marginLeft: 1,
                    }}
                  >
                    {source?.primary_subcategory?.title}
                  </Box>
                </Box> */}
                </Box>
              </Box>
            </Box>
          </Box>
        </Slide>
      </Box>
    </Modal>
  );
}
