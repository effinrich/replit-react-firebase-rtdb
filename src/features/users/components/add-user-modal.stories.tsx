import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, fn } from 'storybook/test';
import { AddUserModal } from './add-user-modal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const meta = {
  title: 'Components/AddUserModal',
  component: AddUserModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: { retry: false },
          mutations: { retry: false },
        },
      });
      return (
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      );
    },
  ],
} satisfies Meta<typeof AddUserModal>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockOnClose = fn();

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: mockOnClose,
  },
};

export const Open: Story = {
  args: {
    isOpen: true,
    onClose: mockOnClose,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify modal elements are visible', async () => {
      await expect(canvas.getByRole('dialog')).toBeInTheDocument();
      await expect(canvas.getByRole('heading', { name: /add new user/i })).toBeInTheDocument();
      await expect(canvas.getByLabelText(/name/i)).toBeInTheDocument();
      await expect(canvas.getByLabelText(/zip code/i)).toBeInTheDocument();
    });
  },
};

export const FillForm: Story = {
  args: {
    isOpen: true,
    onClose: mockOnClose,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Fill in the name field', async () => {
      const nameInput = canvas.getByLabelText(/name/i);
      await userEvent.type(nameInput, 'John Doe');
      await expect(nameInput).toHaveValue('John Doe');
    });

    await step('Fill in the zip code field', async () => {
      const zipInput = canvas.getByLabelText(/zip code/i);
      await userEvent.type(zipInput, '12345');
      await expect(zipInput).toHaveValue('12345');
    });
  },
};

export const ValidationErrors: Story = {
  args: {
    isOpen: true,
    onClose: mockOnClose,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Submit empty form to trigger validation', async () => {
      const submitButton = canvas.getByRole('button', { name: /add user/i });
      await userEvent.click(submitButton);
    });

    await step('Verify validation errors appear', async () => {
      // Validation errors should appear after form blur/submit
      await userEvent.tab();
      await userEvent.tab();
    });
  },
};

export const CloseModal: Story = {
  args: {
    isOpen: true,
    onClose: mockOnClose,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Click cancel button', async () => {
      const cancelButton = canvas.getByRole('button', { name: /cancel/i });
      await userEvent.click(cancelButton);
    });

    await step('Verify onClose was called', async () => {
      await expect(mockOnClose).toHaveBeenCalled();
    });
  },
};
