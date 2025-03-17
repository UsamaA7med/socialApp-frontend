import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownMenu,
  Dropdown,
  DropdownTrigger,
  Avatar,
  Link,
} from "@heroui/react";
import { ThemeSwitcher } from "../../themeSwitcher";
import { Link as link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice/thunk";
import { getProfile } from "../../store/profileSlice/thunk";
import { addToast } from "@heroui/toast";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function NavBar() {
  const { user } = useSelector((state) => state.authSlice);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuItems = [
    { lable: "Home", link: "/" },
    { lable: "Notifications", link: "/notifications" },
  ];

  return (
    <Navbar
      maxWidth="2xl"
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">SocialApp</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">SocialApp</p>
        </NavbarBrand>
        {menuItems.map((item) => (
          <NavbarItem
            isActive={location === item.link ? true : false}
            key={item.lable}
          >
            <Link
              color={location === item.link ? "primary" : "foreground"}
              as={link}
              to={item.link}
            >
              {item.lable}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <ThemeSwitcher />
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              as="button"
              className="transition-transform"
              name="Jason Hughes"
              size="sm"
              src={user.profileImage.url}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem
              onPress={() => {
                dispatch(getProfile(user._id)).then(() =>
                  navigate(`profile/${user._id}`)
                );
              }}
              key="profile"
              className="h-14 gap-2"
            >
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{user.email}</p>
            </DropdownItem>
            <DropdownItem
              onPress={() =>
                dispatch(logout()).then((data) => {
                  if (!data.error) {
                    addToast({
                      title: "Logged out",
                      description: "logged out successfully",
                      color: "success",
                    });
                  }
                })
              }
              key="logout"
              color="danger"
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item) => (
          <NavbarItem
            isActive={location === item.link ? true : false}
            key={item.lable}
          >
            <Link
              color={location === item.link ? "primary" : "foreground"}
              as={link}
              to={item.link}
            >
              {item.lable}
            </Link>
          </NavbarItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
