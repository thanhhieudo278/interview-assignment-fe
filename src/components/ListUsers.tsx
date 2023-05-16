import { useAppSelector } from "../store/store";
import { useEffect, useState } from "react";
import { getUserApi } from "../store/feature/usersSlice";
import {
    Avatar,
    Divider,
    IndexTable,
    LegacyCard,
    Pagination,
    Spinner,
    Text,
} from "@shopify/polaris";

export const ListUsers = () => {
    // get state in rexdux
    const users = useAppSelector((state) => state.usersList);
    const loading = useAppSelector((state) => state.loading.loading);

    const [currentPage, setCurrentPage] = useState(1);

    // logic changing page
    const handleOnPrevious = () => {
        if (currentPage === 1) {
            setCurrentPage(100);
        } else {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleOnNext = () => {
        if (currentPage === 100) {
            setCurrentPage(1);
        } else {
            setCurrentPage(currentPage + 1);
        }
    };

    // get list user with current page
    useEffect(() => {
        getUserApi(currentPage);
    }, [currentPage]);

    // handle mapping data users, row UI represent data users
    const rowsValue = users?.users.map((user, index) => (
        <IndexTable.Row key={index} id="1" position={index}>
            <IndexTable.Cell>
                <Text variant="bodyMd" fontWeight="medium" as="span">
                    {user.name.title}
                    {"."} {user.name.first} {user.name.last}{" "}
                </Text>
            </IndexTable.Cell>
            <IndexTable.Cell>
                <Text variant="bodyMd" fontWeight="medium" as="span">
                    {user.login.username}
                </Text>
            </IndexTable.Cell>
            <IndexTable.Cell className="ps-4">
                <Avatar customer source={user.picture.thumbnail} />
            </IndexTable.Cell>
        </IndexTable.Row>
    ));

    return (
        <LegacyCard
            title={
                <Text variant="headingLg" as="h1">
                    List Users
                </Text>
            }
            sectioned
        >
            {loading ? (
                <div className="text-center pb-3">
                    <Spinner />
                </div>
            ) : (
                <LegacyCard>
                    <IndexTable
                        itemCount={3}
                        headings={[
                            {
                                id: "Full Name",
                                title: (
                                    <Text
                                        variant={"bodyLg"}
                                        as={"h1"}
                                        fontWeight={"bold"}
                                    >
                                        Full Name
                                    </Text>
                                ),
                            },
                            {
                                id: "Username",
                                title: (
                                    <Text
                                        variant={"bodyLg"}
                                        as={"h1"}
                                        fontWeight={"bold"}
                                    >
                                        Username
                                    </Text>
                                ),
                            },
                            {
                                id: "Thumbnail",
                                title: (
                                    <Text
                                        variant={"bodyLg"}
                                        as={"h1"}
                                        fontWeight={"bold"}
                                    >
                                        Thumbnail
                                    </Text>
                                ),
                            },
                        ]}
                        selectable={false}
                    >
                        {rowsValue}
                    </IndexTable>
                    <Divider borderColor="border-inverse" />
                    <div className="float-end p-3">
                        <Pagination
                            label={"page: " + currentPage}
                            hasPrevious
                            previousTooltip={"previous page"}
                            onPrevious={handleOnPrevious}
                            hasNext
                            nextTooltip={"next page"}
                            onNext={handleOnNext}
                        />
                    </div>
                    <div className="clear" />
                </LegacyCard>
            )}
        </LegacyCard>
    );
};
