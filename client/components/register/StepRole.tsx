interface Role {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface StepRoleProps {
  selectedRole: string;
  onRoleChange: (roleId: string) => void;
  roles: Role[];
}

export function StepRole({ selectedRole, onRoleChange, roles }: StepRoleProps) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-1">
          Choose your role
        </h2>
        <p className="text-sm text-muted-foreground">
          You can change this anytime in your settings
        </p>
      </div>

      {/* Role Selection Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {roles.map((role) => (
          <button
            key={role.id}
            type="button"
            onClick={() => onRoleChange(role.id)}
            className={`p-4 rounded-lg border-2 transition-all text-center cursor-pointer ${
              selectedRole === role.id
                ? "border-primary bg-primary/10"
                : "border-border/30 bg-background hover:border-border/60"
            }`}
          >
            <div className="text-3xl mb-2">{role.icon}</div>
            <p className="text-sm font-semibold text-foreground">{role.name}</p>
            <p className="text-xs text-muted-foreground mt-2">
              {role.description}
            </p>
          </button>
        ))}
      </div>

      {/* Role Description */}
      <div className="p-3 bg-secondary/20 border border-border/20 rounded-lg">
        <p className="text-xs text-muted-foreground leading-relaxed">
          {roles.find((r) => r.id === selectedRole)?.description}
        </p>
      </div>
    </div>
  );
}
