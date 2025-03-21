const { render, screen } = require("@testing-library/react");
const Profile = require("./Profile").default;

// 👇 MOCK PromptCard component
jest.mock("./PromptCard", () => ({
  __esModule: true,
  default: ({ post }) => <div>{post.prompt}</div>,
}));

describe("Profile component", () => {
  const mockPosts = [
    {
      _id: "1",
      prompt: "Prompt 1",
      tag: "#tag1",
      creator: { username: "User1" },
    },
    {
      _id: "2",
      prompt: "Prompt 2",
      tag: "#tag2",
      creator: { username: "User2" },
    },
  ];

  const mockHandleEdit = jest.fn();
  const mockHandleDelete = jest.fn();

  test("renders profile name and description", () => {
    render(
      <Profile
        name="John"
        desc="This is John's profile."
        data={mockPosts}
        handleEdit={mockHandleEdit}
        handleDelete={mockHandleDelete}
      />
    );

    expect(screen.getByText("John Profile")).toBeInTheDocument();
    expect(screen.getByText("This is John's profile.")).toBeInTheDocument();
  });

  test("renders all posts as PromptCards", () => {
    render(
      <Profile
        name="John"
        desc="Some description"
        data={mockPosts}
        handleEdit={mockHandleEdit}
        handleDelete={mockHandleDelete}
      />
    );

    expect(screen.getByText("Prompt 1")).toBeInTheDocument();
    expect(screen.getByText("Prompt 2")).toBeInTheDocument();
  });
});
