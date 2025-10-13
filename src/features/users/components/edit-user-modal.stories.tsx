import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, fn } from 'storybook/test';
import { EditUserModal } from './edit-user-modal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { User } from '../../../types/user';

const meta = {
  title: 'Components/EditUserModal',
  component: EditUserModal,
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
} satisfies Meta<typeof EditUserModal>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockOnClose = fn();

const mockUser: User = {
  id: '123',
  name: 'Jane Smith',
  zipCode: '54321',
  latitude: 40.7128,
  longitude: -74.006,
  timezone: -18000,
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: mockOnClose,
    user: mockUser,
  },
};

export const OpenWithUser: Story = {
  args: {
    isOpen: true,
    onClose: mockOnClose,
    user: mockUser,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify modal elements are visible', async () => {
      await expect(canvas.getByRole('dialog')).toBeInTheDocument();
      await expect(canvas.getByRole('heading', { name: /edit user/i })).toBeInTheDocument();
    });

    await step('Verify form is pre-filled with user data', async () => {
      const nameInput = canvas.getByLabelText(/name/i) as HTMLInputElement;
      const zipInput = canvas.getByLabelText(/zip code/i) as HTMLInputElement;
      
      await expect(nameInput).toHaveValue('Jane Smith');
      await expect(zipInput).toHaveValue('54321');
    });
  },
};

export const EditName: Story = {
  args: {
    isOpen: true,
    onClose: mockOnClose,
    user: mockUser,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Clear and update the name field', async () => {
      const nameInput = canvas.getByLabelText(/name/i);
      await userEvent.clear(nameInput);
      await userEvent.type(nameInput, 'John Updated');
      await expect(nameInput).toHaveValue('John Updated');
    });
  },
};

export const EditZipCode: Story = {
  args: {
    isOpen: true,
    onClose: mockOnClose,
    user: mockUser,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Clear and update the zip code field', async () => {
      const zipInput = canvas.getByLabelText(/zip code/i);
      await userEvent.clear(zipInput);
      await userEvent.type(zipInput, '98765');
      await expect(zipInput).toHaveValue('98765');
    });
  },
};

export const CloseModal: Story = {
  args: {
    isOpen: true,
    onClose: mockOnClose,
    user: mockUser,
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

export const NoUser: Story = {
  args: {
    isOpen: true,
    onClose: mockOnClose,
    user: null,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify modal renders with empty form when user is null', async () => {
      await expect(canvas.getByRole('dialog')).toBeInTheDocument();
      const nameInput = canvas.getByLabelText(/name/i) as HTMLInputElement;
      await expect(nameInput).toHaveValue('');
    });
  },
};
