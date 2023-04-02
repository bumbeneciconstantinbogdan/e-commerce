import {
  Breadcrumbs,
  BreadcrumbsItem,
  Button,
  DynamicPageHeader,
  DynamicPageTitle,
  FlexBox,
  FormGroup,
  FormItem,
  Input,
  Label,
  Link,
  ObjectPage,
  ObjectPageSection,
  ObjectStatus,
} from "@ui5/webcomponents-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Profile = () => {
  const navigate = useNavigate();

  const [myProfile, setMyProfile] = useState({
    EMAIL: "",
    ADDRESS: "",
    FIRST_NAME: "",
    LAST_NAME: "",
    PHONE: "",
    PICTURE: "",
    LINK_TO_USER: {},
  });

  const [editMyProfile, setEditMyProfile] = useState({
    ADDRESS: "",
    FIRST_NAME: "",
    LAST_NAME: "",
    PHONE: "",
    PICTURE: "",
  });

  const [editable, setEditable] = useState(false);

  const [triggerRender, setTriggerRender] = useState(false);

  useEffect(() => {
    const handleOnSuccess = (res) => {
      const [profile] = res.data.value.filter(
        (profile) => profile.EMAIL === localStorage.getItem("EMAIL")
      );
      setMyProfile((prev) => profile);
    };

    const handleOnError = (err) => {
      console.error(err);
    };

    axios
      .get("/ecommerce/Profile?$expand=LINK_TO_USER($expand=LINK_TO_ROLE)", {
        headers: { Authorization: localStorage.getItem("Authorization") },
      })
      .then(handleOnSuccess)
      .catch(handleOnError);
  }, [triggerRender]);

  const handleEditAcion = () => {
    const editObject = {};

    if (editMyProfile.ADDRESS) {
      editObject.ADDRESS = editMyProfile.ADDRESS;
    }

    if (editMyProfile.FIRST_NAME) {
      editObject.FIRST_NAME = editMyProfile.FIRST_NAME;
    }

    if (editMyProfile.LAST_NAME) {
      editObject.LAST_NAME = editMyProfile.LAST_NAME;
    }

    if (editMyProfile.PHONE) {
      editObject.PHONE = editMyProfile.PHONE;
    }

    if (editMyProfile.PICTURE) {
      editObject.PICTURE = editMyProfile.PICTURE;
    }

    axios({
      method: "PATCH",
      url: `/ecommerce/Profile/${localStorage.getItem("EMAIL")}`,
      headers: { Authorization: localStorage.getItem("Authorization") },
      data: { ...editObject },
    })
      .then(() => setTriggerRender((prev) => !prev))
      .catch(console.error);
  };

  return (
    <FormGroup titleText="Details">
      <FormItem label="">
        <ObjectPage
          headerContent={
            <DynamicPageHeader>
              <FlexBox alignItems="Center" wrap="Wrap">
                <FlexBox direction="Column">
                  <Link>{myProfile.PHONE}</Link>
                  <Link href={`mailto:${myProfile.EMAIL}`}>
                    {myProfile.EMAIL}
                  </Link>
                  <Link href="https://github.com/bumbeneciconstantinbogdan/e-commerce">
                    https://github.com/bumbeneciconstantinbogdan/e-commerce
                  </Link>
                </FlexBox>
                <FlexBox direction="Column" style={{ padding: "10px" }}>
                  <Label>{myProfile.ADDRESS}</Label>
                </FlexBox>
              </FlexBox>
            </DynamicPageHeader>
          }
          headerContentPinnable
          headerTitle={
            <DynamicPageTitle
              actions={
                <>
                  <Button
                    design="Emphasized"
                    onClick={() => navigate("/logout")}
                  >
                    Logout
                  </Button>
                  <Button
                    style={{ display: editable ? "inherit" : "none" }}
                    onClick={handleEditAcion}
                  >
                    Edit
                  </Button>
                </>
              }
              breadcrumbs={
                <Breadcrumbs>
                  <BreadcrumbsItem>User Details</BreadcrumbsItem>
                </Breadcrumbs>
              }
              header={`${myProfile.FIRST_NAME} ${myProfile.LAST_NAME}`}
              showSubHeaderRight
              subHeader={
                myProfile.LINK_TO_USER?.LINK_TO_ROLE?.DESCRIPTION || "ROLE"
              }
            >
              <ObjectStatus state="Success">Active</ObjectStatus>
            </DynamicPageTitle>
          }
          image={myProfile.PICTURE}
          imageShapeCircle
          onPinnedStateChange={(pinned) => setEditable((prev) => pinned)}
          onSelectedSectionChange={function ka() {}}
          onToggleHeaderContent={function ka() {}}
          selectedSectionId="Edit your profile"
          showHideHeaderButton
          style={{
            height: "700px",
          }}
        >
          <ObjectPageSection
            aria-label="Edit your profile"
            id="Edit your profile"
            titleText="Edit your profile"
          >
            <FormGroup titleText="Press pin to make inputs editable.">
              <FormItem label="First Name">
                <Input
                  onChange={(e) =>
                    setEditMyProfile((prev) => {
                      return { ...prev, FIRST_NAME: e.target.value };
                    })
                  }
                  disabled={!editable}
                  type="text"
                />
              </FormItem>
              <FormItem label="Last Name">
                <Input
                  onChange={(e) =>
                    setEditMyProfile((prev) => {
                      return { ...prev, LAST_NAME: e.target.value };
                    })
                  }
                  disabled={!editable}
                  type="text"
                />
              </FormItem>
              <FormItem label="Phone">
                <Input
                  onChange={(e) =>
                    setEditMyProfile((prev) => {
                      return { ...prev, PHONE: e.target.value };
                    })
                  }
                  disabled={!editable}
                  type="text"
                />
              </FormItem>
              <FormItem label="Address">
                <Input
                  onChange={(e) =>
                    setEditMyProfile((prev) => {
                      return { ...prev, ADDRESS: e.target.value };
                    })
                  }
                  disabled={!editable}
                  type="text"
                />
              </FormItem>
              <FormItem label="Picture">
                <Input
                  onChange={(e) =>
                    setEditMyProfile((prev) => {
                      return { ...prev, PICTURE: e.target.value };
                    })
                  }
                  disabled={!editable}
                  type="text"
                />
              </FormItem>
            </FormGroup>
          </ObjectPageSection>
        </ObjectPage>
      </FormItem>
    </FormGroup>
  );
};

export default Profile;
