import {
  Breadcrumbs,
  BreadcrumbsItem,
  Button,
  DynamicPageHeader,
  DynamicPageTitle,
  FlexBox,
  FormGroup,
  FormItem,
  Label,
  Link,
  ObjectPage,
  ObjectPageSection,
  ObjectStatus,
  Text
} from "@ui5/webcomponents-react";
import { useNavigate } from "react-router";

const Profile = () => {

    const navigate = useNavigate()

  return (
    <FormGroup titleText="Details">
      <FormItem label="">
        <ObjectPage
          headerContent={
            <DynamicPageHeader>
              <FlexBox alignItems="Center" wrap="Wrap">
                <FlexBox direction="Column">
                  <Link>+40 751 123 456</Link>
                  <Link href="mailto:ui5-webcomponents-react@sap.com">
                    bumbenecibogdan35@gmail.com
                  </Link>
                  <Link href="https://github.com/bumbeneciconstantinbogdan/e-commerce">
                    https://github.com/bumbeneciconstantinbogdan/e-commerce
                  </Link>
                </FlexBox>
                <FlexBox direction="Column" style={{ padding: "10px" }}>
                  <Label>UPB</Label>
                  <Label>Bucharest, Romania</Label>
                </FlexBox>
              </FlexBox>
            </DynamicPageHeader>
          }
          headerContentPinnable
          headerTitle={
            <DynamicPageTitle
              actions={
                <>
                  <Button design="Emphasized" onClick={()=>navigate('/logout')}>Logout</Button>
                  <Button>Action</Button>
                </>
              }
              breadcrumbs={
                <Breadcrumbs>
                  <BreadcrumbsItem>User Details</BreadcrumbsItem>
                </Breadcrumbs>
              }
              header="Firstname Lastname"
              showSubHeaderRight
              subHeader="Role"
            >
              <ObjectStatus state="Success">Active</ObjectStatus>
            </DynamicPageTitle>
          }
          image="https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg"
          imageShapeCircle
          onPinnedStateChange={function ka() {}}
          onSelectedSectionChange={function ka() {}}
          onToggleHeaderContent={function ka() {}}
          selectedSectionId="More details"
          showHideHeaderButton
          style={{
            height: "700px",
          }}
        >
        <ObjectPageSection
           aria-label="More details"
           id="More details"
           titleText="More details"
        >
            <Text>
                Nothing Here.
            </Text>

        </ObjectPageSection>

        </ObjectPage>
      </FormItem>
    </FormGroup>
  );
};

export default Profile;
