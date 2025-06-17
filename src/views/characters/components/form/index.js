import { storeToRefs } from 'pinia';
import { defineComponent, onMounted, ref } from 'vue';
import { useCharacterStore } from '@/stores/character';
import { classes } from '@/utils/classes';
import { leveling } from '@/utils/leveling';

export default defineComponent({
	props: {
		editMode: {
			type: Boolean,
			required: true,
		},
	},

	emits: ['update:editMode'],

	setup(_props, { emit }) {
		const characterStore = useCharacterStore();
		const { character } = storeToRefs(characterStore);
		const { setCharacter } = characterStore;
		const charForm = ref({});

		const getClassImage = (charClass) => {
			const classImgSrc = '/clash-of-dice/img/classes';
			return `${classImgSrc}/${charClass}.jpg`;
		};

		const getExpirienseByLevel = (level) => {
			if (charForm.value.experience >= leveling[level]) {
				return leveling[level] - 1;
			} else if (charForm.value.experience < leveling[level - 1]) {
				return leveling[level - 1];
			} else {
				return charForm.value.experience;
			}
		};

		const onCharSubmit = () => {
			const form = charForm.value;

			if (form.name) {
				form.ac = +form.ac || 0;
				form.hp = +form.hp || 0;
				form.img = getClassImage(form.class);
				form.experience = getExpirienseByLevel(form.level);

				setCharacter(charForm.value);
			}

			emit('update:editMode', false);
		};

		onMounted(() => {
			charForm.value = { ...character.value };
		});

		return {
			classes,
			leveling,
			character,
			charForm,
			onCharSubmit,
		};
	},
});
